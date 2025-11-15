"use client";

import { useAuthStore } from "../login/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { useExpediente } from "./hooks/useExpediente";
import {
  EditForm,
  editSchema,
  estadoOptions,
  ExpedienteForm,
  expedienteSchema,
} from "./interfaces/schemas.interface";
import { useCreateExpediente } from "./hooks/useCreateExpediente";
import { useUpdateExp } from "./hooks/useUpdateExp";
import { useDeleteExp } from "./hooks/useDeleteExp";
import ProtectedPage from "../providers/ProtectedPage";

export default function page() {
  //States para modal de editar y id actual
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  //funcion logout del store
  const { logout } = useAuthStore();

  //custom hook para listar los expedientes
  const { data } = useExpediente();

  //custom hooks para create, update y delete
  const { mutation: create } = useCreateExpediente();
  const { mutation: update } = useUpdateExp();
  const { mutation: deleteExp } = useDeleteExp();

  //Formulario para create - conectado al tipo create expediente con zod
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate, isSubmitting },
    reset: resetCreate,
  } = useForm<ExpedienteForm>({
    resolver: zodResolver(expedienteSchema),
  });

  //Formulario para update - conectado al tipo edit expediente con zod
  //Validacion mediante zodresolver
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isSubmitting: isEditSubmitting },
    reset: resetEdit,
  } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
  });

  // handler para el post de expediente
  const onCreateSubmit = async (data: ExpedienteForm) => {
    await create.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Producto creado correctamente"), resetCreate();
      },
      onError: () => {
        toast.error("Error al crear expediente");
      },
    });
  };

  // handler para abrir el modal de editar con el expediente especifico
  const openEditModal = (expediente: EditForm, id: string) => {
    resetEdit(expediente);
    setCurrentId(id);
    setIsModalOpen(true);
  };

  // handler para mandar patch
  const onEditSubmit = async (data: EditForm) => {
    if (!currentId) {
      toast.error("no se encontro el id");
      return;
    }
    await update.mutateAsync(
      { id: currentId, datos: data },
      {
        onSuccess: () => {
          toast.success("Producto editado correctamente"),
            resetEdit(),
            setIsModalOpen(false),
            setCurrentId(null);
        },
        onError: () => {
          toast.error("Error al editar expediente");
        },
      }
    );
  };

  //handler para borrar un expediente
  const handleDelete = async (id: string) => {
    await deleteExp.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Producto eliminado correctamente"), resetCreate();
      },
      onError: () => {
        toast.error("Error al eliminar expediente");
      },
    });
  };

  return (
    <ProtectedPage>
      <main className="p-6 min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel de Expedientes</h1>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* formulario */}
          <section className="bg-white rounded-xl shadow p-6 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Crear expediente</h2>

            {/* Formulario para crear expediente */}
            <form
              onSubmit={handleSubmitCreate(onCreateSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="font-medium">Nombre</label>
                <input
                  type="text"
                  {...registerCreate("nombre")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Proceso Administrativo A-99"
                />
                {errorsCreate.nombre && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsCreate.nombre.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-medium">Descripción</label>
                <textarea
                  {...registerCreate("descripcion")}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Detalles del expediente..."
                />
                {errorsCreate.descripcion && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsCreate.descripcion.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              >
                {isSubmitting ? "Guardando..." : "Crear expediente"}
              </button>
            </form>
          </section>

          {/* Seccion para lista de expedientes, editar y eliminar */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Lista de expedientes</h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 font-medium">Nombre</th>
                  <th className="p-3 font-medium">Descripción</th>
                  <th className="p-3 font-medium">Estado</th>
                  <th className="p-3 font-medium w-32">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {data
                  ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((exp) => (
                    <tr key={exp.id} className="border-b">
                      <td className="p-3">{exp.nombre}</td>
                      <td className="p-3">{exp.descripcion}</td>
                      <td className="p-3">{exp.estado}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          onClick={() => openEditModal(exp, exp.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDelete(exp.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Modal para ediar expediente */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Editar expediente</h2>

              <form
                onSubmit={handleSubmitEdit(onEditSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="font-medium">Título</label>
                  <input
                    type="text"
                    {...registerEdit("nombre")}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errorsEdit.nombre && (
                    <p className="text-red-500 text-sm">
                      {errorsEdit.nombre.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium">Descripción</label>
                  <textarea
                    {...registerEdit("descripcion")}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                    rows={4}
                  />
                  {errorsEdit.descripcion && (
                    <p className="text-red-500 text-sm">
                      {errorsEdit.descripcion.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium">Estado</label>
                  <select
                    {...registerEdit("estado")}
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {estadoOptions.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                  {errorsEdit.estado && (
                    <p className="text-red-500 text-sm">
                      {errorsEdit.estado.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isEditSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {isEditSubmitting ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </ProtectedPage>
  );
}
