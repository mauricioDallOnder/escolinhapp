import { Container } from "@mui/material";
import TemporaryStudentRegistration from "../components/TemporaryStudents/StudentTemporaryRegistration";
import StudentTemporaryPresenceTable from "../components/TemporaryStudents/StudentTemporaryPresenceTable";
import Layout from "@/components/TopBarComponents/Layout";

export default function StudentTemporary(){
return(
    <Layout>
    <Container>
        <TemporaryStudentRegistration/>
        <StudentTemporaryPresenceTable/>
    </Container>
    </Layout>
)
}