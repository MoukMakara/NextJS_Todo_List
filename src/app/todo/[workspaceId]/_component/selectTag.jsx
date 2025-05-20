import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tagValue = [
  { key: "DESIGN", value: "Design" },
  { key: "HOMEWORK", value: "Homework" },
  { key: "ASSIGNMENT", value: "Assignment" },
  { key: "DEPLOYMENT", value: "Deployment" },
  { key: "GIT", value: "Git" },
  { key: "DATABASE", value: "Database" },
  { key: "MINI_PROJECT", value: "Mini Project" },
  { key: "DOCUMENTATION", value: "Documentation" },
  { key: "FEATURE", value: "Feature" },
];

const SelectTagComponent = ({ action, task, setValue, trigger }) => {
  return (
    <Select
      onValueChange={(value) => {
        setValue("tag", value);
        trigger("tag");
      }}
      defaultValue={action === "UPDATE" ? (task ? task.tag : "") : ""}
      className="mb-2"
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Task Tag" />
      </SelectTrigger>
      <SelectContent>
        {tagValue.map((data, index) => (
          <SelectItem key={index} value={data.key}>
            {data.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default SelectTagComponent;
