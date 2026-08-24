// Auto-generated from the connected Supabase schema. Do not edit by hand.

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          completed: boolean
          priority: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
}