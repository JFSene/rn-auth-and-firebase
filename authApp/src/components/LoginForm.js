import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, TextField, Spinner } from './common';


class LoginForm extends Component {
    state = {
        emailTextInput: '',
        passwordTextInput: '',
        error: '',
        loading: false
    };
    onButtonPress() {
        const { emailTextInput, passwordTextInput } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(emailTextInput, passwordTextInput)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(emailTextInput, passwordTextInput)
                    .then(this.onLoginSuccess.bind(this))
                        .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false });
    }
    
    onLoginSuccess() {
        this.setState({ 
            emailTextInput: '',
            passwordTextInput: '',
            loading: false,
            error: ''
         });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }
        return (
            <Button
                onPress={this
                .onButtonPress
                .bind(this)}
                >
                Log in
            </Button>
        );
    }

    renderEmailSection() {
        return (<TextField
            label="Email:"
            placeholder="user@email.com"
            value={this.state.emailTextInput}
            onChangeText={emailTextInput => this.setState({ emailTextInput })} />);
    }

    renderPasswordSection() {
        return (<TextField
            label="Password:"
            placeholder="password"
            secureTextEntry
            value={this.state.passwordTextInput}
            onChangeText={passwordTextInput => this.setState({ passwordTextInput })} />);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    {this.renderEmailSection()}
                </CardSection>

                <CardSection>
                    {this.renderPasswordSection()}
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
