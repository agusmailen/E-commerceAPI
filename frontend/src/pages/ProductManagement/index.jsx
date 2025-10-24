import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
const API_BASE = 'http://localhost:8080/api';

const ProductManagement = () => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: '', estado: 'activo' });
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const canSubmit = useMemo(() => {
    return form.nombre && form.precio && form.categoria && form.stock;
  }, [form]);

  const loadProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/productos`);
      const data = await res.json();
      setProductos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProductos(); }, []);

  // --- Pedidos por usuario (admin) ---
  const [usuarios, setUsuarios] = useState([]);
  const [pedidosPorUsuario, setPedidosPorUsuario] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [pedidosError, setPedidosError] = useState(null);

  const loadUsuariosYPedidos = async () => {
    setLoadingPedidos(true);
    setPedidosError(null);
    try {
      const resUsers = await fetch(`${API_BASE}/usuarios`, { headers: getAuthHeaders() });
      if (!resUsers.ok) throw new Error('No se pudieron obtener los usuarios');
      const users = await resUsers.json();
      setUsuarios(users);

      // Para cada usuario pedir sus pedidos
      const pedidosPromises = users.map(async (u) => {
        try {
          const r = await fetch(`${API_BASE}/pedidos/usuario/${u.id}`, { headers: getAuthHeaders() });
          if (!r.ok) return { usuario: u, pedidos: [] };
          const pd = await r.json();
          return { usuario: u, pedidos: pd };
        } catch (err) {
          return { usuario: u, pedidos: [] };
        }
      });

      const results = await Promise.all(pedidosPromises);
      setPedidosPorUsuario(results);
    } catch (e) {
      console.error(e);
      setPedidosError(e.message || 'Error al cargar pedidos');
    } finally {
      setLoadingPedidos(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getAuthHeaders = (extra = {}) => {
    const token = localStorage.getItem('authToken');
    return {
      ...(extra || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const body = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        imagen: form.imagen || 'https://picsum.photos/seed/new/800/600',
        imagenes: [form.imagen || 'https://picsum.photos/seed/new/800/600'],
        categoria: form.categoria,
        stock: Number(form.stock),
        estado: form.estado || 'activo',
        detalles: {}
      };
      const base = API_BASE;
      if (editingId) {
        await fetch(`${base}/productos/${editingId}`, { method: 'PATCH', headers: getAuthHeaders({ 'Content-Type': 'application/json' }), body: JSON.stringify(body) });
      } else {
        const res = await fetch(`${base}/productos`, { method: 'POST', headers: getAuthHeaders({ 'Content-Type': 'application/json' }), body: JSON.stringify(body) });
        if (!res.ok) throw new Error('No se pudo crear el producto');
      }
      setForm({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: '', estado: 'activo' });
      setEditingId(null);
      await loadProductos();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const base = API_BASE;
      await fetch(`${base}/productos/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      await loadProductos();
    } catch (e) { console.error(e); }
  };

  const handleEstadoChange = async (id, estado) => {
    try {
      const base = API_BASE;
      await fetch(`${base}/productos/${id}`, { method: 'PATCH', headers: getAuthHeaders({ 'Content-Type': 'application/json' }), body: JSON.stringify({ estado }) });
      setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
    } catch (e) { console.error(e); }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setForm({
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: String(producto.precio ?? ''),
      categoria: producto.categoria || '',
      imagen: producto.imagen || '',
      stock: String(producto.stock ?? ''),
      estado: producto.estado || (producto.stock > 0 ? 'activo' : 'agotado')
    });
  };

  const handleResetNew = () => {
    setEditingId(null);
    setForm({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '', stock: '', estado: 'activo' });
  };

  return (
    <div className="pm-container">
      <Header />
  <h1 className="pm-title">⚙️ Gestión</h1>
      <div className="pm-panels">
        <section className="pm-panel pm-left">
          <button className="pm-primary" type="button" onClick={handleResetNew}>Crear Nuevo Producto</button>

          <form onSubmit={handleSubmit}>
            <div className="pm-field"><input className="pm-input" name="nombre" value={form.nombre} onChange={handleChange} placeholder="💬 Nombre del Producto" /></div>
            <div className="pm-field"><input className="pm-input" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="💬 Descripción" /></div>
            <div className="pm-field"><input className="pm-input" name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} placeholder="💰 Precio" /></div>
            <div className="pm-field"><input className="pm-input" name="categoria" value={form.categoria} onChange={handleChange} placeholder="🗂️ Categoría" /></div>
            <div className="pm-field"><input className="pm-input" name="imagen" value={form.imagen} onChange={handleChange} placeholder="📸 URL de Imagen" /></div>
            <div className="pm-field"><input className="pm-input" name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="💬 Stock Inicial" /></div>
            <div className="pm-field">
              <select className="pm-input" name="estado" value={form.estado} onChange={handleChange}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
            <div className="pm-actions">
              <button className="pm-gradient" type="submit" disabled={!canSubmit || submitting}>{submitting ? 'Guardando...' : editingId ? '💾 Guardar Cambios' : '✅ Crear Producto'}</button>
              {editingId && (
                <button className="pm-secondary" type="button" onClick={handleResetNew}>Cancelar</button>
              )}
            </div>
          </form>
        </section>

        <section className="pm-panel pm-right">
          <button className="pm-chip" type="button">Mis Productos</button>

          {loading ? (
            <div className="pm-muted">Cargando...</div>
          ) : (
            productos.map((p) => (
              <div key={p.id} className="pm-card">
                <div className="pm-card-title">{p.nombre}</div>
                <div className="pm-card-sub">Stock: {p.stock} | Precio: ${p.precio}</div>
                <div className="pm-row">
                  <label className="pm-label">Estado</label>
                  <select value={p.estado || (p.stock > 0 ? 'activo' : 'agotado')} onChange={(e) => handleEstadoChange(p.id, e.target.value)} className="pm-input pm-select">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="agotado">Agotado</option>
                  </select>
                </div>
                <div className="pm-card-actions">
                  <button className="pm-btn pm-edit" type="button" onClick={() => handleEdit(p)}>✏️ Editar</button>
                  <button className="pm-btn pm-delete" type="button" onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
      
        <section className="pm-panel pm-fullwidth" style={{ marginTop: 24 }}>
          <h2 className="pm-subtitle">📦 Pedidos por Usuario</h2>
          <div style={{ marginBottom: 12 }}>
            <button className="pm-chip" type="button" onClick={loadUsuariosYPedidos}>Actualizar Pedidos</button>
          </div>
          {loadingPedidos ? (
            <div className="pm-muted">Cargando pedidos...</div>
          ) : pedidosError ? (
            <div className="pm-error">Error: {pedidosError}</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="pm-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Pedido ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/** construir lista plana solo con pedidos existentes */}
                  {pedidosPorUsuario && pedidosPorUsuario.length > 0 ? (
                    pedidosPorUsuario.flatMap(entry => (entry.pedidos || []).map(pedido => ({ usuario: entry.usuario, pedido }))).length === 0 ? (
                      <tr><td colSpan={5} className="pm-muted">No hay pedidos todavía</td></tr>
                    ) : (
                      pedidosPorUsuario.flatMap(entry => (entry.pedidos || []).map(pedido => ({ usuario: entry.usuario, pedido }))).map(({ usuario, pedido }) => (
                        <tr key={`p-${pedido.id}`}>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.email}</td>
                          <td>{pedido.id}</td>
                          <td>{pedido.createdAt ? new Date(pedido.createdAt).toLocaleString() : '-'}</td>
                          <td>{pedido.total ?? '-'}</td>
                        </tr>
                      ))
                    )
                  ) : (
                    <tr><td colSpan={5} className="pm-muted">No hay pedidos todavía</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
    </div>
  );
};

export default ProductManagement;


