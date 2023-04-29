import { Detail, LaunchProps } from "@raycast/api";

interface ConvertArgs {
  amount: string;
  from: string;
  to: string;
}

const Command = (
  props: LaunchProps<{ arguments: ConvertArgs }>
) => {
  const { amount, from, to } = props.arguments;

  return (
    <Detail markdown={`Convert ${amount} ${from} ${to}`} />
  );
};

export default Command;
