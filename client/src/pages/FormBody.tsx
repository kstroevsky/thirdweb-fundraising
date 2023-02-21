import { FormField } from "../components"
import { Campaign } from "../types"


interface FormBodyProps {
  handleFormFieldChange: (fieldName: string, e: any) => unknown
  form: Campaign
}

export const FormBody: React.FC<FormBodyProps> = ({ handleFormFieldChange, form }) => {
  return (
    <>
      <div className="flex flex-wrap gap-[40px]">
        <FormField
          labelName="Campaign Title *"
          placeholder="Write a title"
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange("title", e)}
        />
      </div>

      <FormField
        labelName="Story *"
        placeholder="Write your story"
        isTextArea
        value={form.description}
        handleChange={(e) => handleFormFieldChange("description", e)}
      />

      <div className="flex flex-wrap gap-[40px]">
        <FormField
          labelName="Goal *"
          placeholder="ETH 0.50"
          inputType="text"
          value={form.target}
          handleChange={(e) => handleFormFieldChange("target", e)}
        />
        <FormField
          labelName="End Date *"
          placeholder="End Date"
          inputType="date"
          value={form.deadline}
          handleChange={(e) => handleFormFieldChange("deadline", e)}
        />
      </div>

      <FormField
        labelName="Campaign image *"
        placeholder="Place image URL of your campaign"
        inputType="url"
        value={form.image}
        handleChange={(e) => handleFormFieldChange("image", e)}
      />
    </>
  )
}
