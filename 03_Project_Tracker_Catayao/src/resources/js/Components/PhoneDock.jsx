import { Link } from '@inertiajs/react'
import { Box, Button, Stack, Typography } from '@mui/material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import TaskRoundedIcon from '@mui/icons-material/TaskRounded'

const items = [
    { key: 'dashboard', label: 'Home', icon: DashboardRoundedIcon, href: route('dashboard') },
    { key: 'projects', label: 'Projects', icon: FolderRoundedIcon, href: route('projects.index') },
    { key: 'tasks', label: 'Tasks', icon: TaskRoundedIcon, href: route('tasks.index') },
]

export default function PhoneDock({ active }) {
    return (
        <Box className="phone-dock-wrap">
            <Stack className="phone-dock" direction="row" spacing={0.6}>
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = active === item.key

                    return (
                        <Button
                            key={item.key}
                            component={Link}
                            href={item.href}
                            className={`phone-dock-item ${isActive ? 'is-active' : ''}`}
                        >
                            <Icon fontSize="small" />
                            <Typography variant="caption" sx={{ lineHeight: 1 }}>
                                {item.label}
                            </Typography>
                        </Button>
                    )
                })}
            </Stack>
        </Box>
    )
}
