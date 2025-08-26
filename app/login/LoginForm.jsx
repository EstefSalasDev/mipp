"use client";

import React, { useState } from 'react';
import Image from "next/image";
import solImg from '../../public/images/Sol.png';
import edificiosImg from '../../public/images/edificios.png';
import logoCTPMNImg from '../../public/images/logoCTPMN.png';
import logoMIPPImg from '../../public/images/logoMIPP.png';
import { ToastContainer, toast } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
// Asegúrate de importar el CSS (ajusta la ruta si es necesario)
import './login.css';

export default function LoginForm() {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula, password }),
      });
      let data = null;
      try { data = await res.json(); } catch {}
      if (!res.ok) {
        const msg = [data?.error || 'Error en servidor', data?.detail, data?.hint].filter(Boolean).join(' | ');
        throw new Error(msg);
      }
      if (data.must_change_password) {
        router.push('/change-password?cedula=' + encodeURIComponent(cedula));
      } else {
        router.push('/home');
      }
    } catch (err) {
      alert('Error en login: ' + (err.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Sección izquierda */}
      <div className="left-section">
        <div className="sun-container">
          {/* Puedes poner aquí una imagen SVG o PNG del sol */}
          {<Image src={solImg} alt="Sol" className="sun-image" width={100} height={100}/>}
        </div>
        <div className="title-container">
          <div className="title-content">
            <h1 className="main-title">"Módulo Inteligente de Permisos de Personal +"</h1>
          </div>
        </div>
        <div className="buildings-container">
          {<Image src={edificiosImg} alt="Edificios" className="edificios-image" width={1000} height={1000} />}
        </div>
      </div>
      {/* Sección derecha */}
      <div className="right-section">
        <div className="header-logos">
          <div className="logo-ctpmn">
            {<Image src={logoCTPMNImg} alt="CTPMN" className="ctpmn-logo" width={200} height={75} />}
          </div>
          <div className="logo-mipp">
            {<Image src={logoMIPPImg} alt="MIPP" className="mipp-logo" width={190} height={60} />}
          </div>
        </div>
        <div className="form-container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2 className="form-title">Iniciar sesión</h2>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label" htmlFor="cedula">Identificación:</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    id="cedula"
                    className="form-input"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="password">Contraseña:</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <circle cx="12" cy="16" r="1"></circle>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="forgot-password">
                {<a href="../change-password" className="forgot-link">¿Olvidó la contraseña?</a>}
              </div>
              <button
                className="submit-button"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}