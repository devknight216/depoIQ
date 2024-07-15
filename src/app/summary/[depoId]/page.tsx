import { Layout, Tabs, Menu } from "antd";
import SummaryView from "@/components/summary/SummaryView";
import SummaryNavbar from "@/components/summary/SummaryNavbar";
import Summary, { ISummary, IDepositionSummary, INav } from "@/models/Summary";
import connect from "@/lib/mongoose";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

interface ISummaryPageParams {
    depoId: string
}

async function fetchSummary(depo_id: string): Promise<ISummary> {
    await connect();
    const summary: ISummary | null = await Summary.findOne({ depo_id: depo_id }).lean();

    if (!summary) {
        throw new Response("Not Found Given Summary", { status: 404 });
    }

    return JSON.parse(JSON.stringify(summary));
}

export default async function SummaryPage({ params } : { params: ISummaryPageParams}) {  
    const summary: ISummary = await fetchSummary(params.depoId);
    const depositionSummary: IDepositionSummary = summary.output.table_of_contents[1] as IDepositionSummary;
    const navs : INav[] = depositionSummary.nav;
    const tabMenus = ['High-Level Summary', 'Detailed Summary', 'Page-Line Summary', 'Topical Summary'];

    const tabItems = navs
        .filter(nav => tabMenus.indexOf(nav.title) >= 0)
        .map((nav, index) => ({
            key: nav.title,
            label: nav.title,
            children: <SummaryView title={nav.title} text={nav.text} />
        }));


    return (
        <div className="w-full h-screen pt-5">
            <Layout>
                <Sider theme="light" width={150}>
                    <SummaryNavbar />
                </Sider>
                <Layout className="bg-white">
                    <Content>
                        <Tabs
                            tabPosition="left"
                            items={ tabItems }
                        />
                    </Content>
                </Layout>
            </Layout>
            
        </div>
    )
}