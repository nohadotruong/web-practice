import { formatMessage } from "../../../config/errorMessages";

export default function ConfirmForm({
  setConfirmForm,
  formData,
  setFormData,
  errors,
  setErrors,
  currentLang,
  setLoading,
}) {
  function validate() {
    const errors = {};

    if (!formData.password.trim())
      errors.password = formatMessage(
        currentLang,
        "PASSWORD_REQUIRED"
      );

    return errors;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0
    flex justify-center items-center bg-glass z-999"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-5 
        bg-[var(--confirm-form-bg)] text-[var(--confirm-form-fg)]
        border-1 border-[var(--confirm-form-bd)] rounded-2xl 
        shadow-[var(--confirm-form-shadow)]"
      >
        <p className="text-center text-[20px]">
          Password required to edit!
        </p>

        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded-lg
              border-1 border-[var(--profile-form-ip-bd)]
              focus:border-[var(--profile-form-ip-focus-bd)]
              read-only:cursor-pointer
              read-only:border-[var(--profile-form-ip-disable-bd)]
              transition-all duration-300 ease-in-out"
            style={{
              border: errors.password
                ? "2px solid #ff0000"
                : undefined,
            }}
          />
        </div>

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => setConfirmForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
