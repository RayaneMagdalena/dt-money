import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema - define tipagem e regras de validação
const searchFormSchema = z.object({
  // nome do input - o mesmo que esta em register
  query: z.string(), 
});

// Crio a tipagem usando o Schema
type SearchFormInputs = z.infer<typeof searchFormSchema>;


export function SearchForm() {
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    // Resolver faz a integração do hook-form com o zod.
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>

      <input 
      type="text" 
      placeholder="Busque por transações" 
      {...register('query')}
      />

<button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}