import React from 'react'
import { Table, Input, Button, Tag, Skeleton } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

class GameList extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    sortedInfo: null,
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  render() {
    const { gameList, gameListApiStatus } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '30%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: '15%',
        sorter: (a, b) => a.score - b.score,
        sortOrder: sortedInfo.columnKey === 'score' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Platform',
        dataIndex: 'platform',
        key: 'platform',
        width: '20%',
        ...this.getColumnSearchProps('platform'),
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
        width: '20%',
        render: genre => (
          <span>
            {genre.split(',').map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag} style={{ borderRadius: 10 }}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: 'Released Year',
        dataIndex: 'release_year',
        key: 'release_year',
        width: '15%',
        sorter: (a, b) => a.release_year - b.release_year,
        sortOrder: sortedInfo.columnKey === 'release_year' && sortedInfo.order,
        ellipsis: true,
      },
    ];
    return (
      <div>
        {
          gameListApiStatus !== 'LOADING' ?
            <Table columns={columns} dataSource={gameList} onChange={this.handleChange} scroll={{ y: 470 }} />
            : <Skeleton active paragraph={{ rows: 16 }} />
        }
      </div>
    )
  }
}

export default GameList;