import React, { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthData, isAuthenticated } from '../../utils/auth';
import './login.scss'
import loginIllustration from '../../assets/img/pablo-sign-in.png';
import LogoImg from '../../assets/img/lsqr-logo.png'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

//   redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/users', { replace: true });
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        // Store auth data with email
        setAuthData(email, 'Adedeji');
        
        setIsLoading(false);
        navigate('/users');
      }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left__logo">
          {/* <Logo /> */}
          <img src={LogoImg} alt="" />
        </div>
        <div className="login-left__illustration ">
          <img src={loginIllustration} alt="Welcome illustration" />
        </div>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h1 className="login-form__title">Welcome!</h1>
          <p className="login-form__subtitle">Enter details to login.</p>

          <div className="login-form__group">
            <div className="login-form__input-wrapper">
              <input
                type="email"
                className="login-form__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="login-form__error">{errors.email}</span>}
          </div>

          <div className="login-form__group">
            <div className="login-form__input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-form__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-form__toggle-password"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            {errors.password && <span className="login-form__error">{errors.password}</span>}
          </div>

          <a href="#forgot" className="login-form__forgot-password">
            FORGOT PASSWORD?
          </a>

          <button
            type="submit"
            className="login-form__submit"
            disabled={isLoading}
          >
            {isLoading ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
