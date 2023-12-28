import { Link } from "@nextui-org/react";

function NotFind() {
    // const heroPost = allPosts[0] { allPosts, preview }
    // const morePosts = allPosts.slice(1)
    return (
        <div className="w-full h-full bg-[#F7F8FA] flex justify-strat flex-col items-center">
            <span className="mt-[200px] text-[32px] text-97">404</span>
            <span className="text-[36px] mt-2 mb-2">您访问的页面不存在</span>
            <Link color="primary" target="_self" href="./" className=" cursor-pointer">
                返回首页
            </Link>
        </div>
    );
}
export default NotFind;
