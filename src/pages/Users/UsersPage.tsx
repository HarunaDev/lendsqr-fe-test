import React, { useState, useEffect, useCallback } from 'react';
import  StatsCards  from '../../components/StatsCard/StatsCards';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import type { User, UsersStats, UsersFilter, PaginationInfo } from '../../types/user';
import { getUsers, getUsersStats } from '../../services/mockApi';
import './UserPage.scss'

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UsersStats>({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  });
  const [filters, setFilters] = useState<UsersFilter>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUsers = useCallback((page: number, pageSize: number, currentFilters: UsersFilter) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const result = getUsers(page, pageSize, currentFilters);
      setUsers(result.users);
      setPagination({
        currentPage: page,
        pageSize,
        totalItems: result.total,
        totalPages: Math.ceil(result.total / pageSize),
      });
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    // Fetch stats
    const statsData = getUsersStats();
    setStats(statsData);
    
    // Fetch users
    fetchUsers(1, 10, {});
  }, [fetchUsers]);

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.pageSize, filters);
  };

  const handlePageSizeChange = (pageSize: number) => {
    fetchUsers(1, pageSize, filters);
  };

  const handleFilter = (newFilters: UsersFilter) => {
    setFilters(newFilters);
    fetchUsers(1, pagination.pageSize, newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
    fetchUsers(1, pagination.pageSize, {});
  };

  return (
    <div className="users-page">
      <h1 className="users-page__title">Users</h1>
      
      <StatsCards stats={stats} />
      
      <Table 
        users={users} 
        onFilter={handleFilter}
        onResetFilters={handleResetFilters}
      />
      
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default UsersPage;
