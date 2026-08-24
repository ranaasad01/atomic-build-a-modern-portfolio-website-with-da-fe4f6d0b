"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Edit3, Check, X, Circle, CheckCircle2, Sparkles, LogOut, Calendar, Flag, Filter, Search } from 'lucide-react';

type Priority = "low" | "medium" | "high";
type FilterType = "all" | "active" | "completed";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  created_at: string;
  user_id: string;
}

const priorityConfig: Record<
  Priority,
  { label: string; textClass: string; bgClass: string; borderClass: string }
> = {
  low: {
    label: "Low",
    textClass: "text-green-400",
    bgClass: "bg-green-400/10",
    borderClass: "border-green-400/20",
  },
  medium: {
    label: "Medium",
    textClass: "text-yellow-400",
    bgClass: "bg-yellow-400/10",
    borderClass: "border-yellow-400/20",
  },
  high: {
    label: "High",
    textClass: "text-red-400",
    bgClass: "bg-red-400/10",
    borderClass: "border-red-400/20",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -24,
    scale: 0.96,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const formVariants = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginBottom: 24,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function TodosPage() {
  const router = useRouter();
  const supabase = createClient();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [adding, setAdding] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("medium");
  const [saving, setSaving] = useState(false);

  // Filter / search
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ── Auth + initial fetch ────────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email ?? null);
      await fetchTodos(user.id);
      setLoading(false);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTodos(uid: string) {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTodos(data as Todo[]);
    }
  }

  // ── CRUD ────────────────────────────────────────────────────────────────
  async function addTodo() {
    if (!newTitle.trim() || !userId) return;
    setAdding(true);

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          title: newTitle.trim(),
          description: newDescription.trim(),
          priority: newPriority,
          completed: false,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      setTodos((prev) => [data as Todo, ...prev]);
      setNewTitle("");
      setNewDescription("");
      setNewPriority("medium");
      setShowAddForm(false);
    }
    setAdding(false);
  }

  async function deleteTodo(id: string) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (!error) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  }

  async function toggleTodo(todo: Todo) {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);

    if (!error) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  }

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function updateTodo(id: string) {
    if (!editTitle.trim()) return;
    setSaving(true);

    const { error } = await supabase
      .from("todos")
      .update({
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
      })
      .eq("id", id);

    if (!error) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                title: editTitle.trim(),
                description: editDescription.trim(),
                priority: editPriority,
              }
            : t
        )
      );
      setEditingId(null);
    }
    setSaving(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // ── Derived data ─────────────────────────────────────────────────────────
  const filtered = todos.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !t.completed
        : t.completed;
    return matchesSearch && matchesFilter;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // ── Page ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, rgba(168,85,247,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles
                size={28}
                className="text-[var(--primary)]"
                aria-hidden="true"
              />
              <h1
                className="text-4xl font-bold tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #A855F7 0%, #C084FC 50%, #e9d5ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                My Tasks
              </h1>
            </div>
            <p className="text-[var(--muted-foreground)] text-sm">
              {userEmail && (
                <span className="text-[var(--foreground)]/60">{userEmail}</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
              {totalCount} {totalCount === 1 ? "task" : "tasks"}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all duration-200 text-sm font-medium"
            >
              <LogOut size={15} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: totalCount, color: "text-[var(--foreground)]" },
            { label: "Completed", value: completedCount, color: "text-[var(--primary)]" },
            { label: "Pending", value: pendingCount, color: "text-yellow-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-surface rounded-xl p-4 text-center"
            >
              <p className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </p>
              <p className="text-[var(--muted-foreground)] text-xs uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Search ── */}
        <div className="relative mb-5">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
          />
        </div>

        {/* ── Filter tabs + Add button ── */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--card)] border border-[var(--border)]">
            {(["all", "active", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all duration-200 ${
                  filter === f
                    ? "bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]"
          >
            <Plus size={16} aria-hidden="true" />
            Add Task
          </button>
        </div>

        {/* ── Add form ── */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              key="add-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="card-surface rounded-2xl p-6 border border-[var(--primary)]/20 shadow-[0_0_32px_rgba(168,85,247,0.08)]">
                <h2 className="text-[var(--foreground)] font-semibold text-base mb-4 flex items-center gap-2">
                  <Plus size={16} className="text-[var(--primary)]" aria-hidden="true" />
                  New Task
                </h2>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Task title *"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
                  />

                  <textarea
                    placeholder="Description (optional)"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200 resize-none"
                  />

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Flag size={14} className="text-[var(--muted-foreground)]" aria-hidden="true" />
                      <span className="text-[var(--muted-foreground)] text-xs">Priority:</span>
                    </div>
                    {(["low", "medium", "high"] as Priority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewPriority(p)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border capitalize transition-all duration-200 ${
                          newPriority === p
                            ? `${priorityConfig[p].textClass} ${priorityConfig[p].bgClass} ${priorityConfig[p].borderClass}`
                            : "text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--muted-foreground)]/40"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => {
                          setShowAddForm(false);
                          setNewTitle("");
                          setNewDescription("");
                          setNewPriority("medium");
                        }}
                        className="px-4 py-2 rounded-lg text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addTodo}
                        disabled={!newTitle.trim() || adding}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {adding ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Check size={14} aria-hidden="true" />
                        )}
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Todo list ── */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-5">
                <Sparkles size={28} className="text-[var(--primary)]" aria-hidden="true" />
              </div>
              <p className="text-[var(--foreground)] font-semibold text-lg mb-2">
                {searchQuery
                  ? "No tasks match your search"
                  : filter === "completed"
                  ? "No completed tasks yet"
                  : filter === "active"
                  ? "All caught up! No pending tasks."
                  : "Your task list is empty"}
              </p>
              <p className="text-[var(--muted-foreground)] text-sm">
                {!searchQuery && filter === "all"
                  ? "Add your first task to get started."
                  : "Try a different filter or search term."}
              </p>
            </motion.div>
          ) : (
            <motion.ul className="space-y-3" role="list">
              <AnimatePresence mode="popLayout">
                {filtered.map((todo) => (
                  <motion.li
                    key={todo.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {editingId === todo.id ? (
                      /* ── Inline edit form ── */
                      <div className="card-surface rounded-xl p-5 border border-[var(--primary)]/30 shadow-[0_0_24px_rgba(168,85,247,0.08)]">
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={2}
                            placeholder="Description (optional)"
                            className="w-full px-4 py-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/30 transition-all duration-200 resize-none"
                          />
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <Flag size={14} className="text-[var(--muted-foreground)]" aria-hidden="true" />
                              <span className="text-[var(--muted-foreground)] text-xs">Priority:</span>
                            </div>
                            {(["low", "medium", "high"] as Priority[]).map((p) => (
                              <button
                                key={p}
                                onClick={() => setEditPriority(p)}
                                className={`px-3 py-1 rounded-full text-xs font-medium border capitalize transition-all duration-200 ${
                                  editPriority === p
                                    ? `${priorityConfig[p].textClass} ${priorityConfig[p].bgClass} ${priorityConfig[p].borderClass}`
                                    : "text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--muted-foreground)]/40"
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                            <div className="ml-auto flex items-center gap-2">
                              <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--muted-foreground)]/40 transition-all duration-200"
                              >
                                <X size={13} aria-hidden="true" />
                                Cancel
                              </button>
                              <button
                                onClick={() => updateTodo(todo.id)}
                                disabled={!editTitle.trim() || saving}
                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {saving ? (
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"
                                  />
                                ) : (
                                  <Check size={13} aria-hidden="true" />
                                )}
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ── Todo card ── */
                      <div
                        className={`card-surface rounded-xl p-4 flex items-start gap-4 group transition-all duration-200 hover:border-[var(--primary)]/30 ${
                          todo.completed ? "opacity-60" : ""
                        }`}
                      >
                        {/* Toggle button */}
                        <button
                          onClick={() => toggleTodo(todo)}
                          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                          className="mt-0.5 flex-shrink-0 transition-all duration-200 hover:scale-110"
                        >
                          {todo.completed ? (
                            <CheckCircle2
                              size={22}
                              className="text-[var(--primary)]"
                              aria-hidden="true"
                            />
                          ) : (
                            <Circle
                              size={22}
                              className="text-[var(--muted-foreground)] group-hover:text-[var(--primary)]/60"
                              aria-hidden="true"
                            />
                          )}
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-semibold leading-snug mb-1 ${
                              todo.completed
                                ? "line-through text-[var(--muted-foreground)]"
                                : "text-[var(--foreground)]"
                            }`}
                          >
                            {todo.title}
                          </p>
                          {todo.description && (
                            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-2">
                              {todo.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                                priorityConfig[todo.priority].textClass
                              } ${
                                priorityConfig[todo.priority].bgClass
                              } ${
                                priorityConfig[todo.priority].borderClass
                              }`}
                            >
                              <Flag size={10} aria-hidden="true" />
                              {priorityConfig[todo.priority].label}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                              <Calendar size={10} aria-hidden="true" />
                              {formatDate(todo.created_at)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                          <button
                            onClick={() => startEdit(todo)}
                            aria-label="Edit task"
                            className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200"
                          >
                            <Edit3 size={15} aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            aria-label="Delete task"
                            className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                          >
                            <Trash2 size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* ── Footer hint ── */}
        {filtered.length > 0 && (
          <p className="text-center text-xs text-[var(--muted-foreground)] mt-10">
            Showing {filtered.length} of {totalCount}{" "}
            {totalCount === 1 ? "task" : "tasks"}
          </p>
        )}
      </div>
    </div>
  );
}
