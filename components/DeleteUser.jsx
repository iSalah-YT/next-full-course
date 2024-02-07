'use client';

import { Input, Button } from '@material-tailwind/react';
import { useState } from 'react';

const DeleteUser = () => {
  const [id, setId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert('Please provide user ID to delete the user.');
      return;
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User Deleted Successfully');
        clearForm();
      } else {
        const data = await response.json();
        alert(data.result || 'Something went wrong while deleting the user');
      }
    } catch (error) {
      alert(error);
    }
  };

  const clearForm = () => {
    setId('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="User ID"
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Button className="mt-2" type="submit">
          Delete User
        </Button>
      </form>
    </div>
  );
};

export default DeleteUser;
