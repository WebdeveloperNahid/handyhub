"use client";

import { Chip, Pagination, Table } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { getUsers } from "@/app/api/admin_api/GetAllUser";

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const PAGE_SIZE = 4;

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

  useEffect(() => {
    getUsers().then((result) => {
      console.log("API result:", result);

      if (!result.error) {
        setUsers(result.data);
      }
    });
  }, []);

  const sortedUsers = useMemo(() => {
    if (!sortColumn) return users;

    return [...users].sort((a, b) => {
      const comparison = String(a[sortColumn]).localeCompare(
        String(b[sortColumn])
      );

      return sortDirection === "ascending" ? comparison : -comparison;
    });
  }, [users, sortColumn, sortDirection]);

  const pageCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

  const paginatedUsers = sortedUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const start = sortedUsers.length ? (page - 1) * PAGE_SIZE + 1 : 0;
  const end = Math.min(page * PAGE_SIZE, sortedUsers.length);

  return (
    <div className="w-full">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Manage users table" className="min-w-[600px]" sortDescriptor={
              sortColumn? {column: sortColumn,  direction: sortDirection,  }  : undefined}
            onSortChange={(descriptor) => {
              setSortColumn(descriptor.column as keyof User);
              setSortDirection(descriptor.direction);
              setPage(1);
            }}
          >
            <Table.Header>
              <Table.Column id="_id" allowsSorting isRowHeader>
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}> ID</Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column id="name" allowsSorting>
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>  Name </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column id="email" allowsSorting>
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}> Email</Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column id="role" allowsSorting>
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}> Role</Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column id="emailVerified" allowsSorting>
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>  Email Verified </Table.SortableColumnHeader>
                )}
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedUsers.map((user) => (
                <Table.Row key={user._id} id={user._id}>
                  <Table.Cell>{user._id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>

                  <Table.Cell>
                    <Chip size="sm" variant="soft"> {user.role} </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip color={user.emailVerified ? "success" : "danger"} size="sm" variant="soft">
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </Chip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} to {end} of {sortedUsers.length} results
            </Pagination.Summary>

            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous isDisabled={page === 1}
                  onPress={() => setPage(page - 1)}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from(
                { length: pageCount },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <Pagination.Item key={pageNumber}>
                  <Pagination.Link
                    isActive={pageNumber === page}
                    onPress={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === pageCount}
                  onPress={() => setPage(page + 1)}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  );
}