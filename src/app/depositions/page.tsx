// src/app/depositions/page.tsx
import Deposition, { IDeposition } from '../../models/Deposition';
import connect from '../../lib/mongoose';
import DepositionTable from '@/components/deposition/DepositionTable';

export const metadata = {
  title: 'Depositions',
};

async function fetchDepositions(): Promise<IDeposition[]> {
  await connect();
  const depositions: IDeposition[] = await Deposition.find().lean();
  return JSON.parse(JSON.stringify(depositions));
}

export default async function DepositionsPage() {
  const depositions = await fetchDepositions();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Depositions Dashboard</h1>
      <DepositionTable datasource={depositions}/>
    </div>
  );
}
