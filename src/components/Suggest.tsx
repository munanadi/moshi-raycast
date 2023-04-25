import { ActionPanel, Form, Action } from "@raycast/api";
import { useState } from "react";

export default function Suggest() {
  const [programmingLanguage, setProgrammingLanguage] =
    useState<string>("typescript");

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit Favorite"
            onSubmit={(values) => console.log(values)}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown
        id="dropdown"
        title="Favorite Language"
        value={programmingLanguage}
        onChange={setProgrammingLanguage}
      >
        <Form.Dropdown.Item value="cpp" title="C++" />
        <Form.Dropdown.Item
          value="javascript"
          title="JavaScript"
        />
        <Form.Dropdown.Item value="ruby" title="Ruby" />
        <Form.Dropdown.Item value="python" title="Python" />
        <Form.Dropdown.Item value="swift" title="Swift" />
        <Form.Dropdown.Item
          value="typescript"
          title="TypeScript"
        />
      </Form.Dropdown>
    </Form>
  );
}
