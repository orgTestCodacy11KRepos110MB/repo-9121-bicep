export interface TemplateMetadata {
  template: any;
  parameters: ParamDefinition[];
}

export interface ParamDefinition {
  type: string;
  name: string;
  defaultValue?: string;
}

export interface ParamData {
  useDefault: boolean;
  value: string;
}