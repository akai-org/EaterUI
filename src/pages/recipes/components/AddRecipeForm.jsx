import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
// import { createRecipe } from "../../../api/recipes";
import useCreateRecipe from "../hooks/useAddRecipe";

const inputStyles = { display: "inline-block", margin: "0px 24px" };

function AddRecipeForm({ onRecipeAdded }) {
  // const [state, setState] = React.useState({ isIdle: true });

  // const handleCreateRecipe = React.useCallback(async (values) => {
  //   setState({ isLoading: true });
  //   try {
  //     const data = await createRecipe(values);
  //     setState({ isSuccess: true, data });
  //     return data;
  //   } catch (error) {
  //     setState({ isError: true, error });
  //   }
  // }, []);

  // return [mutate, state]

  const [handleCreateRecipe, state] = useCreateRecipe();

  async function onSubmit(data) {
    console.log("onSubmit", { data });

    try {
      const resp = await handleCreateRecipe(data);
      onRecipeAdded({ ...resp, ...data });
    } catch (error) {
      console.error({ error });
    }
  }

  // form implementation details - let's not bother about that...

  const { register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create recipe</h2>
      <div>
        <label htmlFor="name">name:</label>
        <input {...register("name", { required: true })} style={inputStyles} />
      </div>
      <div>
        <label htmlFor="description">description:</label>
        <input
          {...register("description", { required: true })}
          style={inputStyles}
        />
      </div>
      <div>
        <label htmlFor="graphicURL">graphic URL:</label>
        <input {...register("graphicURL")} style={inputStyles} />
      </div>

      <div>
        <p>ingredients:</p>
        <ul>
          {fields.map((field, index) => (
            <li key={field.id} style={{ display: "flex" }}>
              <div>
                <label htmlFor={`ingredients.${index}.name`}>name:</label>
                <input
                  key={field.id}
                  style={inputStyles}
                  {...register(`ingredients.${index}.name`, { required: true })}
                />
              </div>
              <div>
                <label htmlFor={`ingredients.${index}.amount`}>amount:</label>
                <input
                  key={field.id}
                  type="number"
                  style={inputStyles}
                  {...register(`ingredients.${index}.amount`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div>
                <label htmlFor={`ingredients.${index}.measure`}>measure:</label>
                <input
                  key={field.id}
                  style={inputStyles}
                  {...register(`ingredients.${index}.measure`, {
                    required: true,
                  })}
                />
              </div>
              <button type="button" onClick={() => remove(index)}>
                remove
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => append({ id: Math.random().toString() })}
        >
          add ingredient
        </button>
      </div>
      <br />
      <button type="submit" disabled={!!state?.isLoading}>
        create recipe
      </button>

      <p>create recipe state:</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
}

export default AddRecipeForm;
