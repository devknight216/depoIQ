import mongoose from 'mongoose';

export interface IDeposition {
  _id: string;
  depo_id: string;
  title: string;
  witness: string;
  depoDate: Date;
  caseName: string;
  pages: number;
  video: string;
  fileSize: string;
  filename: string;
  progress: string;
}

const depositionSchema = new mongoose.Schema<IDeposition>({
  depo_id: { type: String, required: true },
  title: { type: String, required: true },
  witness: { type: String, required: true },
  depoDate: { type: Date, required: true },
  caseName: { type: String, required: true },
  pages: { type: Number, default: null },
  video: { type: String, enum: ['Yes', 'No', 'N/A'], required: true },
  fileSize: { type: String, required: true },
  filename: { type: String, required: true },
  progress: { type: String, enum: ['Ready', 'Analyzing', 'Uploading', 'Failed'], required: true },
});

export default mongoose.models.Deposition || mongoose.model<IDeposition>('Deposition', depositionSchema);
