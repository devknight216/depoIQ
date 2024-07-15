import mongoose, { Schema, Document } from 'mongoose';

export interface ITableSummary {
    title: string;
    description: string;
    text: string;
}

export interface INav {
    title: string;
    description: string;
    text: string;
}

export interface IDepositionSummary {
    title: string;
    description: string;
    nav: INav[];
}

export type ITableOfContents = ITableSummary | IDepositionSummary;

export interface ISummary extends Document {
    _id: mongoose.Types.ObjectId;
    depo_id: string;
    output: {
        table_of_contents: ITableOfContents[];
    };
}

const NavSchema = new Schema<INav>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    text: { type: String, required: true }
});

const TableOfContentsSchema = new Schema<ITableOfContents>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    text: { type: String },
    nav: [NavSchema],
});

const SummarySchema = new Schema<ISummary>({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    depo_id: { type: String, required: true },
    output: {
        table_of_contents: [TableOfContentsSchema],
    }
}, { collection: 'responses', timestamps: true });

const Summary = mongoose.models.Summary || mongoose.model<ISummary>('Summary', SummarySchema);

export default Summary;
