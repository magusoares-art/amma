// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      pre_cadastros: {
        Row: {
          area_atuacao: string
          beneficios_interesse: string[]
          canal_contato: string
          cidade: string
          comentario_adicional: string | null
          cpf: string
          created_at: string
          documentacao_organizada: string | null
          email: string
          empresa: string | null
          expectativa_principal: string
          formas_participacao: string[]
          id: string
          interesse_capacitacao: boolean
          interesse_convenios: boolean
          interesse_representacao: boolean
          interesse_seguros: boolean
          lgpd_marketing: boolean
          lgpd_privacidade: boolean
          lgpd_tratamento: boolean
          lgpd_veracidade: boolean
          licenca: string | null
          melhor_horario_contato: string | null
          nome: string
          pedido_inss: string | null
          prioridade_juridica: string | null
          processo_andamento: string | null
          regioes: string[]
          resumo_necessidade: string | null
          segmento: string
          situacao_profissional: string
          status_aprovacao: string
          status_caso: string | null
          temas_juridicos: string[]
          temas_previdenciarios: string[]
          tempo_atuacao: string
          uf: string
          whatsapp: string
        }
        Insert: {
          area_atuacao: string
          beneficios_interesse?: string[]
          canal_contato: string
          cidade: string
          comentario_adicional?: string | null
          cpf: string
          created_at?: string
          documentacao_organizada?: string | null
          email: string
          empresa?: string | null
          expectativa_principal: string
          formas_participacao?: string[]
          id?: string
          interesse_capacitacao?: boolean
          interesse_convenios?: boolean
          interesse_representacao?: boolean
          interesse_seguros?: boolean
          lgpd_marketing?: boolean
          lgpd_privacidade?: boolean
          lgpd_tratamento?: boolean
          lgpd_veracidade?: boolean
          licenca?: string | null
          melhor_horario_contato?: string | null
          nome: string
          pedido_inss?: string | null
          prioridade_juridica?: string | null
          processo_andamento?: string | null
          regioes?: string[]
          resumo_necessidade?: string | null
          segmento: string
          situacao_profissional: string
          status_aprovacao?: string
          status_caso?: string | null
          temas_juridicos?: string[]
          temas_previdenciarios?: string[]
          tempo_atuacao: string
          uf: string
          whatsapp: string
        }
        Update: {
          area_atuacao?: string
          beneficios_interesse?: string[]
          canal_contato?: string
          cidade?: string
          comentario_adicional?: string | null
          cpf?: string
          created_at?: string
          documentacao_organizada?: string | null
          email?: string
          empresa?: string | null
          expectativa_principal?: string
          formas_participacao?: string[]
          id?: string
          interesse_capacitacao?: boolean
          interesse_convenios?: boolean
          interesse_representacao?: boolean
          interesse_seguros?: boolean
          lgpd_marketing?: boolean
          lgpd_privacidade?: boolean
          lgpd_tratamento?: boolean
          lgpd_veracidade?: boolean
          licenca?: string | null
          melhor_horario_contato?: string | null
          nome?: string
          pedido_inss?: string | null
          prioridade_juridica?: string | null
          processo_andamento?: string | null
          regioes?: string[]
          resumo_necessidade?: string | null
          segmento?: string
          situacao_profissional?: string
          status_aprovacao?: string
          status_caso?: string | null
          temas_juridicos?: string[]
          temas_previdenciarios?: string[]
          tempo_atuacao?: string
          uf?: string
          whatsapp?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          is_admin: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_admin?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean | null
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          cardholder: string
          created_at: string
          date: string
          details: string | null
          establishment: string
          id: string
          installment_id: string | null
          installment_number: number | null
          invoice_month: string
          total_installments: number | null
          user_id: string | null
        }
        Insert: {
          amount: number
          cardholder: string
          created_at?: string
          date: string
          details?: string | null
          establishment: string
          id?: string
          installment_id?: string | null
          installment_number?: number | null
          invoice_month: string
          total_installments?: number | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          cardholder?: string
          created_at?: string
          date?: string
          details?: string | null
          establishment?: string
          id?: string
          installment_id?: string | null
          installment_number?: number | null
          invoice_month?: string
          total_installments?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: pre_cadastros
//   id: uuid (not null, default: gen_random_uuid())
//   nome: text (not null)
//   cpf: text (not null)
//   whatsapp: text (not null)
//   email: text (not null)
//   cidade: text (not null)
//   uf: text (not null)
//   canal_contato: text (not null)
//   situacao_profissional: text (not null)
//   area_atuacao: text (not null)
//   licenca: text (nullable)
//   empresa: text (nullable)
//   tempo_atuacao: text (not null)
//   segmento: text (not null)
//   regioes: _text (not null, default: '{}'::text[])
//   beneficios_interesse: _text (not null, default: '{}'::text[])
//   interesse_convenios: boolean (not null, default: false)
//   interesse_seguros: boolean (not null, default: false)
//   interesse_capacitacao: boolean (not null, default: false)
//   interesse_representacao: boolean (not null, default: false)
//   temas_juridicos: _text (not null, default: '{}'::text[])
//   prioridade_juridica: text (nullable)
//   processo_andamento: text (nullable)
//   status_caso: text (nullable)
//   temas_previdenciarios: _text (not null, default: '{}'::text[])
//   pedido_inss: text (nullable)
//   resumo_necessidade: text (nullable)
//   documentacao_organizada: text (nullable)
//   melhor_horario_contato: text (nullable)
//   formas_participacao: _text (not null, default: '{}'::text[])
//   expectativa_principal: text (not null)
//   comentario_adicional: text (nullable)
//   lgpd_privacidade: boolean (not null, default: false)
//   lgpd_tratamento: boolean (not null, default: false)
//   lgpd_marketing: boolean (not null, default: false)
//   lgpd_veracidade: boolean (not null, default: false)
//   created_at: timestamp with time zone (not null, default: now())
//   status_aprovacao: text (not null, default: 'Pendente'::text)
// Table: profiles
//   id: uuid (not null)
//   email: text (not null)
//   name: text (not null)
//   is_admin: boolean (nullable, default: false)
//   created_at: timestamp with time zone (not null, default: now())
// Table: transactions
//   id: uuid (not null, default: gen_random_uuid())
//   date: date (not null)
//   invoice_month: character varying (not null)
//   cardholder: text (not null)
//   establishment: text (not null)
//   amount: numeric (not null)
//   details: text (nullable)
//   installment_id: text (nullable)
//   installment_number: integer (nullable)
//   total_installments: integer (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   user_id: uuid (nullable)

// --- CONSTRAINTS ---
// Table: pre_cadastros
//   PRIMARY KEY pre_cadastros_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: transactions
//   PRIMARY KEY transactions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY transactions_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL

// --- ROW LEVEL SECURITY POLICIES ---
// Table: pre_cadastros
//   Policy "allow_anon_insert_pre_cadastros" (INSERT, PERMISSIVE) roles={anon,authenticated}
//     WITH CHECK: true
//   Policy "allow_authenticated_select_pre_cadastros" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "allow_authenticated_update_pre_cadastros" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: profiles
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (id = auth.uid())
// Table: transactions
//   Policy "authenticated_delete" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_insert" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "authenticated_select" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "authenticated_update" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id, email, name, is_admin)
//     VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), FALSE)
//     ON CONFLICT (id) DO NOTHING;
//     RETURN NEW;
//   END;
//   $function$
//
