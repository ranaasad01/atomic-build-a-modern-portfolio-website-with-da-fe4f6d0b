"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Circle, Trash2, Pencil, X, Check, ListTodo, Sparkles, LogOut, Filter, Calendar, Flag, ChevronDown } from 'lucide-react';
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Priority = "low" | "medium" | "high";
type FilterType = "all" | "active" | "completed";

interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  due_date: string | null;
  created_at: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; dot: string }> = {
  low: {
    label: "Low",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    dot: "bg-emerald-400",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400",
  },
  high: {
    label: "High",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
    dot: "bg-red-400",
  },
};

// ─── Task Card ───────────────────────────────────────────────────────────────

function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}) {
  const p = PRIORITY_CONFIG[task.priority];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative bg-[var(--card)] border rounded-2xl p-5 transition-all duration-200 hover:border-[var(--primary)]/30 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)] ${
        task.completed ? "border-[var(--border)]/50 opacity-60" : "border-[var(--border)]"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id, task.completed)}
          className="mt-0.5 flex-shrink-0 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200"
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed ? (
            <CheckCircle2 size={22} className="text-[var(--primary)]" />
          ) : (
            <Circle size={22} />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`font-semibold text-sm leading-snug ${
                task.completed
                  ? "line-through text-[var(--muted-foreground)]"
                  : "text-[var(--foreground)]"
              }`}
            >
              {task.title}
            </h3>
            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200"
                aria-label="Edit task"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                aria-label="Delete task"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-relaxed line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {/* Priority badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${
                p.bg
              } ${p.color}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>

            {/* Due date */}
            {task.due_date && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                <Calendar size={11} />
                {new Date(task.due_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Task Modal ───────────────────────────────────────────────────────────────

function TaskModal({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Task, "id" | "user_id" | "created_at" | "completed">) => Promise<void>;
  initial?: Task | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setDescription(initial?.description ?? "");
      setPriority(initial?.priority ?? "medium");
      setDueDate(initial?.due_date ?? "");
    }
  }, [open, initial]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate || null,
    });
    setSaving(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[0_8px_64px_-16px_rgba(0,0,0,0.8)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                <h2 className="font-bold text-[var(--foreground)] text-lg">
                  {initial ? "Edit task" : "New task"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-all duration-200"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-6 space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    required
                    autoFocus
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Priority */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                      Priority
                    </label>
                    <div className="relative">
                      <Flag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" />
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                        className="w-full pl-9 pr-8 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Due date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">
                      Due date
                    </label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none" />
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200 [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/20 text-sm font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || !title.trim()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_16px_var(--glow-primary)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Check size={16} />
                    )}
                    {initial ? "Save changes" : "Add task"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in");
    }
  }, [user, loading, router]);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error && data) {
      setTasks(data as Task[]);
    }
    setFetching(false);
  }, [user, supabase]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  async function handleSave(
    data: Omit<Task, "id" | "user_id" | "created_at" | "completed">
  ) {
    if (!user) return;
    if (editingTask) {
      const { data: updated, error } = await supabase
        .from("tasks")
        .update(data)
        .eq("id", editingTask.id)
        .select()
        .single();
      if (!error && updated) {
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? (updated as Task) : t))
        );
      }
    } else {
      const { data: created, error } = await supabase
        .from("tasks")
        .insert({ ...data, user_id: user.id, completed: false })
        .select()
        .single();
      if (!error && created) {
        setTasks((prev) => [created as Task, ...prev]);
      }
    }
    setEditingTask(null);
  }

  async function handleToggle(id: string, currentCompleted: boolean) {
    const { data: updated, error } = await supabase
      .from("tasks")
      .update({ completed: !currentCompleted })
      .eq("id", id)
      .select()
      .single();
    if (!error && updated) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? (updated as Task) : t))
      );
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function openNew() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTask(null);
  }

  // Filtered tasks
  const filteredTasks = tasks.filter((t) => {
    const statusMatch =
      filter === "all"
        ? true
        : filter === "active"
        ? !t.completed
        : t.completed;
    const priorityMatch =
      priorityFilter === "all" ? true : t.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--primary)]/4 blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent)]/3 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-medium mb-4">
                <Sparkles size={12} />
                Task Manager
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-1">
                My Tasks
              </h1>
              <p className="text-[var(--muted-foreground)] text-sm">
                {user.email}
              </p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/20 text-sm font-medium transition-all duration-200 flex-shrink-0 mt-1"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </motion.div>

          {/* Progress bar */}
          {totalCount > 0 && (
            <motion.div variants={fadeInUp} className="mt-6">
              <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-2">
                <span>{completedCount} of {totalCount} completed</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Toolbar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-[var(--card)] border border-[var(--border)] rounded-xl p-1">
            {(["all", "active", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                  filter === f
                    ? "bg-[var(--primary)] text-white shadow-[0_0_12px_var(--glow-primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-[var(--muted-foreground)]" />
            <div className="flex items-center gap-1 bg-[var(--card)] border border-[var(--border)] rounded-xl p-1">
              {(["all", "high", "medium", "low"] as (Priority | "all")[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                    priorityFilter === p
                      ? "bg-[var(--primary)] text-white shadow-[0_0_12px_var(--glow-primary)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Add task button */}
          <button
            onClick={openNew}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_16px_var(--glow-primary)]"
          >
            <Plus size={16} />
            New task
          </button>
        </motion.div>

        {/* Task list */}
        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mx-auto mb-5">
              <ListTodo size={28} className="text-[var(--muted-foreground)]" />
            </div>
            <h3 className="text-[var(--foreground)] font-semibold mb-2">
              {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm mb-6">
              {tasks.length === 0
                ? "Create your first task to get started."
                : "Try adjusting your filters."}
            </p>
            {tasks.length === 0 && (
              <button
                onClick={openNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--accent)] text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_16px_var(--glow-primary)]"
              >
                <Plus size={16} />
                Create first task
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <Fragment key={task.id}>
                  <TaskCard
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={openEdit}
                  />
                </Fragment>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initial={editingTask}
      />
    </div>
  );
}
