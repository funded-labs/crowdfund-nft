import { createContext, useContext, useState } from "react";

const INITIAL_STATE = {
    profile: null,
    setProfile: () => {},
    project: null,
    setProject: () => {},
    step: 1,
    setStep: () => {}
};

export const ProjectFormContext = createContext(INITIAL_STATE);

export function ProjectFormProvider({ children }) {
    const [profile, setProfile] = useState(INITIAL_STATE.profile);
    const [project, setProject] = useState(INITIAL_STATE.project);
    const [step, setStep] = useState(INITIAL_STATE.step);

    const value = { profile, setProfile, project, setProject, step, setStep };

    return (
        <ProjectFormContext.Provider value={value}>
            {children}
        </ProjectFormContext.Provider>
    )
}

export function useProjectForm() {
    const context = useContext(ProjectFormContext);
    return context;
}