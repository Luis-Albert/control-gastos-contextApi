import { categories } from "../data/categories"

export default function ExpenseForm() {
  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          className="bg-slate-100 p-2"
          placeholder="Añade el nombre del gasto"
          name="expenseName"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          className="bg-slate-100 p-2"
          placeholder="Añade la cantidad del gasto: Ej. 300"
          name="amount"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select id="category" className="bg-slate-100 p-2" name="category">
          <option value="">--Seleccione--</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer uppercase font-bold rounde-lg text-white w-full p-2"
        value={"Registrar Gasto"}
      />
    </form>
  )
}
