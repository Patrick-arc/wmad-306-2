# Section 6: Relationships & Functionality Verification

## Overview

This section ensures the User → Project → Task hierarchy works correctly and that task status and priority persist correctly throughout the application.

## Relationship Structure

```
User (1)
  └── Projects (Many)
      └── Tasks (Many)
```

### Relationships Implemented

**User Model:**
- `projects()` - HasMany relationship to Project

**Project Model:**
- `user()` - BelongsTo relationship to User
- `tasks()` - HasMany relationship to Task

**Task Model:**
- `project()` - BelongsTo relationship to Project

## Database Schema

### Projects Table
- `id` (Primary Key)
- `user_id` (Foreign Key) - References users.id with CASCADE delete
- `title` (String)
- `description` (Text, nullable)
- `created_at`, `updated_at` (Timestamps)

### Tasks Table
- `id` (Primary Key)
- `project_id` (Foreign Key) - References projects.id with CASCADE delete
- `title` (String)
- `description` (Text, nullable)
- `priority` (String: 'low', 'medium', 'high')
- `status` (String: 'pending', 'in_progress', 'completed')
- `created_at`, `updated_at` (Timestamps)

## Testing the Relationships

### Option 1: Using Tinker (Interactive Testing)

```bash
# Enter Tinker console
php artisan tinker

# Create a user with projects and tasks
$user = User::factory()->create();
$project = Project::factory()->create(['user_id' => $user->id]);
$task = Task::factory()->create(['project_id' => $project->id]);

# Test User → Project relationship
$user->projects;  # Returns collection of projects
$user->projects()->count();  # Count of projects

# Test Project → Task relationship
$project->tasks;  # Returns collection of tasks
$project->tasks()->count();  # Count of tasks

# Test Task → Project relationship
$task->project;  # Returns the project
$task->project->user;  # Returns the user (navigate full hierarchy)

# Test status persistence
$task->update(['status' => 'in_progress']);
$task->fresh()->status;  # Verify status persisted

# Test priority persistence
$task->update(['priority' => 'high']);
$task->fresh()->priority;  # Verify priority persisted

# Test cascading deletes
$user->delete();  # Deletes user, all projects, and all tasks
```

### Option 2: Running Feature Tests

```bash
# Run all relationship tests
php artisan test tests/Feature/ProjectTaskHierarchyTest.php

# Run specific test
php artisan test tests/Feature/ProjectTaskHierarchyTest.php::ProjectTaskHierarchyTest::test_complete_hierarchy

# Run authorization tests
php artisan test tests/Feature/ProjectTaskAuthorizationTest.php

# Run all tests with coverage
php artisan test --coverage
```

## Query Scopes

### Project Scopes
- `byUser($userId)` - Filter projects by user ID
  ```php
  Project::byUser($userId)->get()
  ```

### Task Scopes
- `byStatus($status)` - Filter tasks by status
  ```php
  Task::byStatus('pending')->get()
  ```
- `byPriority($priority)` - Filter tasks by priority
  ```php
  Task::byPriority('high')->get()
  ```
- `inProject($projectId)` - Filter tasks by project
  ```php
  Task::inProject($projectId)->get()
  ```

## Authorization with Policies

**ProjectPolicy:**
- `view()` - User can view only their own projects
- `update()` - User can update only their own projects
- `delete()` - User can delete only their own projects

**TaskPolicy:**
- `view()` - User can view tasks in their projects
- `update()` - User can update tasks in their projects
- `delete()` - User can delete tasks in their projects

All policies verify that the task's project belongs to the authenticated user.

## Performance Considerations

### Eager Loading
The controllers use eager loading to prevent N+1 queries:

**ProjectController (index):**
```php
$projects = auth()->user()->projects()->with('tasks')->get();
```

**TaskController (index):**
```php
$tasks = Task::whereHas('project', function ($query) {
    $query->where('user_id', auth()->id());
})
    ->with('project')
    ->get();
```

## Cascading Behavior

When a resource is deleted, all dependent resources are also deleted:

1. **Delete User** → Deletes all Projects → Deletes all Tasks
2. **Delete Project** → Deletes all Tasks
3. **Delete Task** → No cascade (leaf node)

This is enforced by foreign key constraints with `onDelete('cascade')` in migrations.

## Task Status & Priority Flow

### Task Status Lifecycle
- `pending` (Initial) → `in_progress` → `completed`
- Can toggle by clicking the status chip in the Tasks index

### Task Priority Levels
- `low` - Green indicator
- `medium` - Orange indicator
- `high` - Red indicator

### Persistence Mechanism
Status and priority are stored as VARCHAR fields in the tasks table and persisted through:
1. Create/Store operations
2. Update/Patch operations
3. Frontend form submissions via PUT/PATCH requests
4. Status toggle via PATCH requests with the `toggle-status` endpoint

## Frontend Integration

### Projects Pages
- **Index**: Lists all user projects with eager-loaded task counts
- **Create/Edit**: Form validation through `StoreProjectRequest` and `UpdateProjectRequest`
- **Show**: Displays project details with associated tasks

### Tasks Pages
- **Index**: Lists only user's tasks (scoped through project ownership)
- **Create/Edit**: Form validation with priority and status dropdowns
- **Show**: Displays task details with project information

### Task Status Toggle
Click any task's status chip to cycle:
`pending` → `in_progress` → `completed` → `pending`

This uses a PATCH request to update the status without full form submission.

## Verification Checklist

- [ ] User can create multiple projects
- [ ] Projects are filtered by authenticated user
- [ ] Each project can have multiple tasks
- [ ] Tasks are filtered by project
- [ ] Task status can be updated and persists
- [ ] Task priority can be updated and persists
- [ ] Users cannot access other users' projects (authorization)
- [ ] Deleting a user deletes all projects and tasks
- [ ] Deleting a project deletes all tasks
- [ ] Controllers use eager loading (no N+1 queries)
- [ ] All feature tests pass
