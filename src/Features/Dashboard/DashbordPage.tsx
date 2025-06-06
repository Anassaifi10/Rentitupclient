import Layout from "../../Layout";
import CategorySection from "./Components/CategorySection";
import DashBordUpperImage from "./Components/DashBordUpperImage";

function DashbordPage() {
    return (
        <Layout>
            <div className="h-full w-screen">

                <DashBordUpperImage />
                <div className="flex flex-col">
                   <CategorySection/>

                </div>
            </div>
        </Layout>
    );
}

export default DashbordPage;
