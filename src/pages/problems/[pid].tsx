import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/WorkSpace/Workspace';
import React from 'react';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return (
        <div>
            <Topbar problemPage/>
            <Workspace/>
        </div>
    )
}
export default ProblemPage;