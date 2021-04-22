export interface Success {
  statusCode: number;
  status: string;
  doc: any;
}

export interface Failed {
  statusCode: number;
  message: string;
}
