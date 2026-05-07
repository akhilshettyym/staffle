import { vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAdminCreateTaskForm from '../../hooks/AdminHooks/useAdminCreateTaskForm';

vi.mock('../../api/admin', () => ({
    createTask: vi.fn(),
}))

vi.mock('../../api/tasks', () => ({
    getTaskDetails: vi.fn(),
}))

vi.mock('../../utils/useEmployeesDetails', () => ({
    default: () => ({ employees: [], fetchEmployees: vi.fn() }),
}))

vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn(),
    useSelector: () => ({ tasks: [] }),
}))

vi.mock('../../slices/taskSlice', () => ({
    createTaskSuccess: vi.fn(),
    setAllTasks: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: { success: vi.fn(), error: vi.fn() },
}))

import toast from 'react-hot-toast';
import { createTask } from '../../api/admin';

describe('useAdminCreateTaskForm', () => {

    beforeEach(() => vi.clearAllMocks())

    const createEvent = () => {
        const form = document.createElement('form')
        form.innerHTML = `
     <input name="title" value="Task"/>
     <input name="category" value="Dev"/>
     <input name="description" value="Desc"/>
     <input name="assignedTo" value="1"/>
     <input name="priority" value="High"/>
   `
        return { preventDefault: vi.fn(), target: form }
    }

    it('should create task successfully', async () => {
        createTask.mockResolvedValue({ success: true, task: {} })

        const { result } = renderHook(() => useAdminCreateTaskForm())

        act(() => {
            result.current.handleOnChange(new Date())
        })

        await act(async () => {
            await result.current.handleCreateTask(createEvent())
        })

        expect(createTask).toHaveBeenCalled()
        expect(toast.success).toHaveBeenCalled()
    })

    it('should fail validation', async () => {
        const { result } = renderHook(() => useAdminCreateTaskForm())

        await act(async () => {
            await result.current.handleCreateTask(createEvent())
        })

        expect(toast.error).toHaveBeenCalled()
    })
})