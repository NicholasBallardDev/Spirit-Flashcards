import { Ellipsis } from "lucide-react";

export function MoreButton(){
    return(
        <div className="flex bg-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-400 max-w-8 max-h-8 items-center justify-center">
            <Ellipsis size={16} className="text-gray-700"/>
        </div>
    );
}