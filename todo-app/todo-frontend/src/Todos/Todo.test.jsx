import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';
import { describe, it, expect, vi } from 'vitest';

describe('Test Todo component', () => {
  const mockTodo = {
    text: 'Learn Docker',
    done: false,
  };

  const mockDeleteTodo = vi.fn();
  const mockCompleteTodo = vi.fn();

  it('renders the todo text and action buttons', () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />,
    );

    expect(screen.getByText(/Learn Docker/i)).toBeInTheDocument();

    expect(screen.getByText(/This todo is not done/i)).toBeInTheDocument();

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Set as done/i)).toBeInTheDocument();
  });

  it('calls deleteTodo when the Delete button is clicked', async () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />,
    );

    await userEvent.click(screen.getByText(/Delete/i));

    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo);
  });

  it('calls completeTodo when the Set as done button is clicked', async () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />,
    );

    await userEvent.click(screen.getByText(/Set as done/i));

    expect(mockCompleteTodo).toHaveBeenCalledWith(mockTodo);
  });

  it('renders correct content when todo is marked as done', () => {
    const doneTodo = { ...mockTodo, done: true };

    render(
      <Todo
        todo={doneTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />,
    );

    expect(screen.getByText(/Learn Docker/i)).toBeInTheDocument();

    expect(screen.getByText(/This todo is done/i)).toBeInTheDocument();

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.queryByText(/Set as done/i)).toBeNull();
  });
});
