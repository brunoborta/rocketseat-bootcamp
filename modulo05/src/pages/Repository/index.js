import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Filter, Buttons } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { value: 'all', label: 'Todos' },
      { value: 'open', label: 'Abertos' },
      { value: 'closed', label: 'Fechados' },
    ],
    filterActive: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleChange = async event => {
    await this.setState({ filterActive: event.target.value });
    this.loadIssues();
  };

  handleClick = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'prox' ? page + 1 : page - 1,
    });
    this.loadIssues();
  };

  async loadIssues() {
    const { filterActive, repository, page } = this.state;
    await this.setState({ loading: true });

    try {
      const issues = await api.get(`/repos/${repository.full_name}/issues`, {
        params: {
          state: filterActive,
          per_page: 5,
          page,
        },
      });

      this.setState({
        issues: issues.data,
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  showContent() {
    const { issues, filterActive, filters, page } = this.state;

    if (issues.length) {
      return (
        <IssueList>
          {!!issues.length && (
            <Filter value={filterActive} onChange={this.handleChange}>
              {filters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </Filter>
          )}
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Buttons>
            <button
              onClick={() => this.handleClick('ant')}
              disabled={page < 2}
              type="button"
            >
              Anterior
            </button>
            <button onClick={() => this.handleClick('prox')} type="button">
              Proximo
            </button>
          </Buttons>
        </IssueList>
      );
    }
    return <p>Não há issues para este repositório</p>;
  }

  render() {
    const { repository, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner size={36} color="#fff" />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        {this.showContent()}
      </Container>
    );
  }
}

export default Repository;
