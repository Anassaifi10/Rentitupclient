import Layout from "../../Layout";
import CategorySection from "./Components/CategorySection";
import DashBordUpperImage from "./Components/DashBordUpperImage";
import ItemSection from "./Components/ItemSection";

function DashbordPage() {
    return (
        <Layout>
            <div className="h-full w-screen">

                <DashBordUpperImage />
                <div className="flex flex-col">
                   <CategorySection/>
                   <ItemSection/>
                </div>
            </div>
        </Layout>
    );
}

export default DashbordPage;
