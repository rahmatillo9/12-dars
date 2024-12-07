import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Yo'q
          </Button>
          <Button onClick={onConfirm} variant="destructive">
            Ha
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function TodoItem({
  title,
  deleteTodo,
  id,
  editTodo,
  list,
  setList,
  description,
  status,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  function editedTodo(todoId) {
    const todo = list.find(({ id }) => id === todoId);
    const newTodoName = prompt("Yangi ma'lumotni kiriting", todo.todoName);
    const newTodo = { todoName: newTodoName, id: todoId };
    setList(editTodo(newTodo, list));
  }

  function handleDelete() {
    setList(deleteTodo(id, list));
    setModalOpen(false);
  }

  function defineStatus(status) {
    if (status === "bajarilmagan") {
      return "destructive";
    } else if (status === "jarayonda") {
      return "outline";
    } else {
      return "default";
    }
  }

  return (
    <Card className="p-4 md:p-6 lg:p-8">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm md:text-base lg:text-lg">
          <p>{description}</p>
          <strong>
            Status: {<Badge variant={defineStatus(status)}>{status}</Badge>}
          </strong>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <TooltipProvider delayDuration={0}>
          <div className="flex flex-wrap gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="mr-3"
                  onClick={() => setModalOpen(true)}
                  variant="destructive"
                  type="button"
                >
                  <TrashIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>O`chirish</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => editedTodo(id)}
                  variant="outline"
                  type="button"
                >
                  <Pencil1Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tahrirlash</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>


        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDelete}
          title="Todoni o'chirishni tasdiqlang"
          description="Todoni o'chirishni xohlaysizmi? Ushbu amal qaytarib bo'lmaydi."
        />
      </CardFooter>
    </Card>
  );
}
