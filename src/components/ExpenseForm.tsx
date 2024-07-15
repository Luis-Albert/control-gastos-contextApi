/* eslint-disable react-hooks/exhaustive-deps */
import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import { ChangeEvent, useEffect, useState } from "react"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import { DraftExpense, Value } from "../types"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date()
  })

  const [error, setError] = useState("")
  const { dispatch, state } = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0]
      setExpense(editingExpense)
    }
  }, [state.editingId])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const isAmountField = ["amount"].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //validate
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios")
      return
    }

    //Agregar o actualizar gasto al reducer
    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } }
      })
    } else {
      dispatch({ type: "add-expense", payload: { expense } })
    }

    //reiniciar el state
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date()
    })
    setError("")
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>
      {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
          value={expense.expenseName}
          onChange={handleChange}
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
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">--Seleccione--</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer uppercase font-bold rounde-lg text-white w-full p-2"
        value={state.editingId ? "Actualizar Gasto" : "Registrar Gasto"}
      />
    </form>
  )
}
