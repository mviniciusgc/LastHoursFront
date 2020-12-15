import React, { useCallback, useRef } from 'react';
import { Container, Content, Backgroud, AnimationContainer } from './styles';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast} from '../../hooks/Toast';


interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}
const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const {addToast} = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório.'),
                email: Yup.string().required('E-mail obrigatório.').email('Digite um e-mail válido.'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos.')
            })

            await schema.validate(data, {
                abortEarly: false,
            });
            await api.post('/users', data);


            addToast({
                type:'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no  GoBarber!',
            })

            history.push('/');
        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastr',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
            });
        }


        console.log(data);
    }, [addToast, history]);
    return (
        <Container>
            <Backgroud />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input icon={FiUser} name="name" placeholder="Nome" />
                        <Input icon={FiMail} name="email" placeholder="E-mail" />
                        <Input icon={FiLock} name="password" placeholder="Senha" type="password" />
                        <Button type="submit">Cadastrar</Button>
                    </Form>
                    <Link to="/">
                        <FiArrowLeft />
                   Voltar para login
                </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
}

export default SignUp;