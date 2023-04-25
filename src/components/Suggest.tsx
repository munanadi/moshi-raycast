import {
  ActionPanel,
  Form,
  Action,
  useNavigation,
} from "@raycast/api";
import { useState } from "react";

export default function Suggest({
  title,
  base,
  prompt,
  suggestions,
  setSelectedValue,
}: any) {
  const { pop } = useNavigation();

  const [baseCoin, setBaseCoin] = useState<any>("");

  return (
    suggestions && (
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm
              title={prompt}
              onSubmit={(values) => {
                // console.log(values, " selected");
                setSelectedValue(values[title]);
                pop();
              }}
            />
          </ActionPanel>
        }
      >
        <Form.Dropdown
          id={title}
          title={prompt}
          value={baseCoin}
          onChange={setBaseCoin}
        >
          {suggestions?.map((coin: any) => (
            <Form.Dropdown.Item
              key={coin.id}
              value={coin.id}
              title={coin.name}
            />
          ))}
        </Form.Dropdown>
      </Form>
    )
  );
}
