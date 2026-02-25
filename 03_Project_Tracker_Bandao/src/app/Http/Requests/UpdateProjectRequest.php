<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Verify the user owns the project
        $project = $this->route('project');
        return $project && $project->user_id === $this->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $projectId = $this->route('project')->id;
        return [
            'title' => 'required|string|max:255|unique:projects,title,' . $projectId . ',id,user_id,' . auth()->id(),
            'description' => 'nullable|string|max:1000',
        ];
    }
}
