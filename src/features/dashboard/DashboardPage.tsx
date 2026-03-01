import { CreateTaskForm } from "@/components/CreateTaskForm";
import { TaskBoard } from "@/components/TaskBoard";
import { Flex, Heading } from "@radix-ui/themes";
import { PageContainer } from "./PageContainer";

export default function DashboardPage() {
  return (
    <PageContainer>
      <Flex
        direction={{ initial: "column", sm: "row" }}
        align={{ initial: "start", sm: "center" }}
        justify="between"
        gap="4"
        className="mb-8"
      >
        <Heading as="h1" size={{ initial: "7", sm: "8" }} weight="light">
          Quadro de Tarefas
        </Heading>
        <CreateTaskForm />
      </Flex>

      <TaskBoard />
    </PageContainer>
  );
}
