// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      pre_cadastros: {
        Row: {
          area_atuacao: string | null
          beneficios_interesse: string[]
          canal_contato: string
          cidade: string
          comentario_adicional: string | null
          created_at: string
          data_nascimento: string | null
          documentacao_organizada: string | null
          email: string
          empresa: string | null
          expectativa_principal: string | null
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
          receber_informacoes: boolean
          regioes: string[]
          resumo_necessidade: string | null
          segmento: string | null
          sexo: string | null
          situacao_profissional: string | null
          status_caso: string | null
          temas_juridicos: string[]
          temas_previdenciarios: string[]
          tempo_atuacao: string | null
          uf: string
          whatsapp: string
        }
        Insert: {
          area_atuacao?: string | null
          beneficios_interesse?: string[]
          canal_contato: string
          cidade: string
          comentario_adicional?: string | null
          created_at?: string
          data_nascimento?: string | null
          documentacao_organizada?: string | null
          email: string
          empresa?: string | null
          expectativa_principal?: string | null
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
          receber_informacoes?: boolean
          regioes?: string[]
          resumo_necessidade?: string | null
          segmento?: string | null
          sexo?: string | null
          situacao_profissional?: string | null
          status_caso?: string | null
          temas_juridicos?: string[]
          temas_previdenciarios?: string[]
          tempo_atuacao?: string | null
          uf: string
          whatsapp: string
        }
        Update: {
          area_atuacao?: string | null
          beneficios_interesse?: string[]
          canal_contato?: string
          cidade?: string
          comentario_adicional?: string | null
          created_at?: string
          data_nascimento?: string | null
          documentacao_organizada?: string | null
          email?: string
          empresa?: string | null
          expectativa_principal?: string | null
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
          receber_informacoes?: boolean
          regioes?: string[]
          resumo_necessidade?: string | null
          segmento?: string | null
          sexo?: string | null
          situacao_profissional?: string | null
          status_caso?: string | null
          temas_juridicos?: string[]
          temas_previdenciarios?: string[]
          tempo_atuacao?: string | null
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
          is_admin: boolean
          name: string
        }
        Insert: {
          created_at?: string
          email?: string
          id: string
          is_admin?: boolean
          name?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean
          name?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

