import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfilePage from './UserProfilePage';

describe('UserProfilePage', () => {
  it('renders without crashing', () => {
    render(<UserProfilePage />);
    expect(screen.getByText('Profil')).toBeInTheDocument();
    // Ajoutez d'autres assertions ici
  });

  it('handles form submission correctly', async () => {
    render(<UserProfilePage />);
    // Simulez le remplissage du formulaire et la soumission
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'John' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Enregistrer' }));
    // Ajoutez des assertions pour vérifier le comportement attendu après la soumission
    // Par exemple, vous pouvez vérifier si une alerte a été affichée
    await screen.findByText('Les modifications ont été enregistrées');
  });

  // Ajoutez d'autres tests en fonction de votre logique
});