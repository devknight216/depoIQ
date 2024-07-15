// src/app/exhibits/page.tsx
import Exhibit, { IExhibit } from '../../models/Exhibit';
import connect from '../../lib/mongoose';
import ExhibitTable from '@/components/exhibits/ExhibitTable';

export const metadata = {
  title: 'Exhibits',
};

async function fetchExhibits(): Promise<IExhibit[]> {
  await connect();
  const depositions: IExhibit[] = await Exhibit.find().lean();
  return JSON.parse(JSON.stringify(depositions));
}

export default async function ExhibitsPage() {
  const depositions = await fetchExhibits();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Exhibits Dashboard</h1>
      <ExhibitTable datasource={depositions}/>
    </div>
  );
}
