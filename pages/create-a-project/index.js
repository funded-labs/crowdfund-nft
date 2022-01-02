import CreateAProjectForm from "@/components/create-a-project/form";
import Navbar from "@/components/shared/navbar";

export default function CreateAProject() {
    return (
        <div className='w-full'>
            <Navbar />
            <CreateAProjectForm />
        </div>
    )
}