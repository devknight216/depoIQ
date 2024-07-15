// /models/Exhibit.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IExhibit extends Document {
    exhibit_number: string;
    summary: string;
    title: string;
    date: Date;
    reference: string;
}

const exhibitSchema: Schema = new Schema({
    exhibit_number: { type: String, required: true },
    summary: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    reference: { type: String, required: true },
});

const Exhibit = mongoose.models.Exhibit || mongoose.model<IExhibit>('Exhibit', exhibitSchema, 'exhibits');

export default Exhibit;
