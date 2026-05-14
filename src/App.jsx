import { useState, useEffect } from 'react';

// Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const EmptyStateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const EmptyDoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('taskNotes') || '';
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { 
        id: crypto.randomUUID(), 
        text: 'Master React Hooks', 
        completed: false,
        subtasks: [
          { id: crypto.randomUUID(), text: 'Learn useState', completed: true },
          { id: crypto.randomUUID(), text: 'Learn useEffect', completed: false }
        ]
      },
      { id: crypto.randomUUID(), text: 'Build a gorgeous Kanban Board', completed: true, subtasks: [] },
      { id: crypto.randomUUID(), text: 'Implement Drag and Drop', completed: false, subtasks: [] }
    ];
  });

  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  // Drag and drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskNotes', notes);
  }, [notes]);

  // Initialize theme on mount
  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, []);

  // Update theme when isDarkMode changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      subtasks: []
    };

    setTasks([newTask, ...tasks]);
    setInputValue('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        return { 
          ...task, 
          completed: newCompleted,
          subtasks: task.subtasks ? task.subtasks.map(st => ({ ...st, completed: newCompleted })) : []
        };
      }
      return task;
    }));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.text);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === '') return;
    
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editValue.trim() } : task
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addSubtask = (taskId, text) => {
    if (text.trim() === '') return;
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...(task.subtasks || []), { id: crypto.randomUUID(), text: text.trim(), completed: false }]
        };
      }
      return task;
    }));
  };

  const toggleSubtaskComplete = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(st => 
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        
        return {
          ...task,
          subtasks: updatedSubtasks
        };
      }
      return task;
    }));
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter(st => st.id !== subtaskId)
        };
      }
      return task;
    }));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Hide default drag image styling by setting it dragging
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  };

  const handleDragEnd = (e) => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== column) {
      setDragOverColumn(column);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetCompletedStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (!draggedTaskId) return;

    setTasks(tasks.map(task => {
      if (task.id === draggedTaskId) {
        return { 
          ...task, 
          completed: targetCompletedStatus,
          subtasks: task.subtasks ? task.subtasks.map(st => ({ ...st, completed: targetCompletedStatus })) : []
        };
      }
      return task;
    }));
  };

  const todoTasks = tasks.filter(task => !task.completed && task.text.toLowerCase().includes(inputValue.toLowerCase()));
  const completedTasks = tasks.filter(task => task.completed && task.text.toLowerCase().includes(inputValue.toLowerCase()));

  // Component to render a single task item to avoid repetition
  const TaskItem = ({ task }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newSubtaskText, setNewSubtaskText] = useState('');
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    const isSelected = selectedTaskId === task.id;

    const handleAddSubtask = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addSubtask(task.id, newSubtaskText);
        setNewSubtaskText('');
      }
    };

    return (
      <li 
        className={`todo-item-container ${editingId === task.id ? 'editing' : ''} ${isSelected ? 'selected' : ''}`}
        draggable={editingId !== task.id}
        onDragStart={(e) => handleDragStart(e, task.id)}
        onDragEnd={handleDragEnd}
        onClick={() => setSelectedTaskId(task.id)}
        style={{ cursor: editingId === task.id ? 'default' : 'grab' }}
      >
        <div className="todo-item">
          <div className="checkbox-wrapper" onClick={(e) => { e.stopPropagation(); if (editingId !== task.id) toggleComplete(task.id); }}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={task.completed}
              readOnly
            />
          </div>

          <div className="todo-content">
            {editingId === task.id ? (
              <input
                type="text"
                className="edit-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit(task.id);
                  if (e.key === 'Escape') cancelEdit();
                }}
                autoFocus
              />
            ) : (
              <div className="todo-text-wrapper">
                <span className={`todo-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </span>
                {hasSubtasks && (
                  <span className="subtask-badge">
                    {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="todo-actions" onClick={(e) => e.stopPropagation()}>
            <button className="action-btn caret" onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} title="Subtasks">
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
            {editingId === task.id ? (
              <>
                <button className="action-btn save" onClick={(e) => { e.stopPropagation(); saveEdit(task.id); }} title="Save">
                  <CheckIcon />
                </button>
                <button className="action-btn cancel" onClick={(e) => { e.stopPropagation(); cancelEdit(); }} title="Cancel">
                  <CancelIcon />
                </button>
              </>
            ) : (
              <>
                {!task.completed && (
                  <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); startEdit(task); }} title="Edit">
                    <EditIcon />
                  </button>
                )}
                <button className="action-btn delete" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} title="Delete">
                  <DeleteIcon />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Subtasks Section */}
        {isExpanded && (
          <div className="subtasks-container">
            {task.subtasks && task.subtasks.map(subtask => (
              <div key={subtask.id} className="subtask-item" onClick={() => toggleSubtaskComplete(task.id, subtask.id)}>
                <div className="checkbox-wrapper subtask-checkbox-wrapper">
                  <input type="checkbox" className="todo-checkbox subtask-checkbox" checked={subtask.completed} readOnly />
                </div>
                <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>{subtask.text}</span>
                <button className="action-btn delete subtask-delete" onClick={(e) => { e.stopPropagation(); deleteSubtask(task.id, subtask.id); }}>
                  <DeleteIcon />
                </button>
              </div>
            ))}
            <div className="add-subtask-wrapper">
              <PlusIcon className="add-subtask-icon" />
              <input 
                type="text" 
                className="add-subtask-input" 
                placeholder="Add subtask..." 
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={handleAddSubtask}
              />
            </div>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="workspace">
      <header className="workspace-header">
        <div className="header-top">
          <h1>Task Board</h1>
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle Theme">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <p>Your beautiful, unique Kanban workspace.</p>
      </header>

      <div className="content-layout">
        <div className="left-panel">
          {/* Unified Search & Add Area */}
          <section className="new-task-area">
            <form className="todo-form" onSubmit={addTask}>
              <input
                type="text"
                className="todo-input"
                placeholder="Search tasks or add a new one..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="add-btn" disabled={!inputValue.trim()}>
                Add to Workspace
              </button>
            </form>
          </section>

          {/* Kanban Columns */}
          <div className="kanban-board">
            
            {/* Task  Column */}
            <section 
              className={`kanban-column ${dragOverColumn === 'todo' ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, 'todo')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, false)}
            >
              <div className="column-header">
                <h2 className="todo-title">Task</h2>
                <span className="task-count">{todoTasks.length}</span>
              </div>
              
              {todoTasks.length === 0 ? (
                <div className="empty-state">
                  <EmptyStateIcon />
                  <p>No tasks here. You're all caught up!</p>
                </div>
              ) : (
                <ul className="todo-list">
                  {todoTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </ul>
              )}
            </section>

            {/* Completed Column */}
            <section 
              className={`kanban-column ${dragOverColumn === 'done' ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, 'done')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, true)}
            >
              <div className="column-header">
                <h2 className="done-title">Completed</h2>
                <span className="task-count">{completedTasks.length}</span>
              </div>

              {completedTasks.length === 0 ? (
                <div className="empty-state">
                  <EmptyDoneIcon />
                  <p>Nothing finished yet. Get to work!</p>
                </div>
              ) : (
                <ul className="todo-list">
                  {completedTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </ul>
              )}
            </section>

          </div>
        </div>

        {/* Task Notes Right Panel */}
        <aside className="task-notes-area">
          <div className="column-header">
            <h2>{selectedTask ? 'Task Notes' : 'Global Notes'}</h2>
            {selectedTask && (
              <button 
                className="action-btn cancel" 
                onClick={() => setSelectedTaskId(null)} 
                title="Deselect Task"
                style={{ width: '32px', height: '32px' }}
              >
                <CancelIcon />
              </button>
            )}
          </div>
          {selectedTask && (
            <div className="selected-task-info">
              <h3 className="selected-task-title">{selectedTask.text}</h3>
            </div>
          )}
          <textarea 
            className="notes-textarea"
            placeholder={selectedTask ? `Notes for "${selectedTask.text}"...` : "Jot down your thoughts, ideas, or global notes here..."}
            value={selectedTask ? (selectedTask.notes || '') : notes}
            onChange={(e) => {
              if (selectedTask) {
                setTasks(tasks.map(t => t.id === selectedTaskId ? { ...t, notes: e.target.value } : t));
              } else {
                setNotes(e.target.value);
              }
            }}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
