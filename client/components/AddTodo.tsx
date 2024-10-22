import { useState } from "react";
import { Button, Modal, TextInput, Textarea, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ENDPOINT, Todo } from "../src/App";
import { KeyedMutator } from "swr";

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        },
    });

    async function createTodo(values: { title: string; body: string }) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((r) => r.json());

        mutate(updated);
        form.reset();
        setOpen(false);
    }

    return (
        <>
            <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
                <form onSubmit={form.onSubmit(createTodo)}>
                    <TextInput
                        required
                        mb={12}
                        label="Todo"
                        placeholder="What do you want to do?"
                        {...form.getInputProps("title")}
                    />
                    <Textarea
                        required
                        mb={12}
                        label="Body"
                        placeholder="Tell me more..."
                        {...form.getInputProps("body")}
                    />

                    <Button type="submit">Create todo</Button>
                </form>
            </Modal>

            <Box style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <Button fullWidth style={{ maxWidth: "40rem" }} onClick={() => setOpen(true)}>
                    ADD TODO
                </Button>
            </Box>



        </>
    );
}

export default AddTodo;