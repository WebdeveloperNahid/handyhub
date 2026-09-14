
"use client";

import {Chip, Pagination, Table} from "@heroui/react";
import {useMemo, useState} from "react";



interface User {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive" | "On Leave";
  email: string;
}

const statusColorMap: Record<
  User["status"],
  "success" | "danger" | "warning"
> = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
};

const users: User[] = [
  {
    id: 1,
    name: "Kate Moore",
    role: "CEO",
    status: "Active",
    email: "kate@acme.com",
  },
  {
    id: 2,
    name: "John Smith",
    role: "CTO",
    status: "Active",
    email: "john@acme.com",
  },
  {
    id: 3,
    name: "Sara Johnson",
    role: "CMO",
    status: "On Leave",
    email: "sara@acme.com",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "CFO",
    status: "Active",
    email: "michael@acme.com",
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Product Manager",
    status: "Inactive",
    email: "emily@acme.com",
  },
  {
    id: 6,
    name: "Davis Wilson",
    role: "Lead Designer",
    status: "Active",
    email: "davis@acme.com",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    role: "Frontend Engineer",
    status: "Active",
    email: "olivia@acme.com",
  },
  {
    id: 8,
    name: "James Taylor",
    role: "Backend Engineer",
    status: "Active",
    email: "james@acme.com",
  },
];

const PAGE_SIZE = 4;

export default function ManageUsersPage() {
  const [page, setPage] = useState(1);

  const [sortColumn, setSortColumn] = useState<keyof User | null>(
    null
  );

  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

  // Sorting
  const sortedUsers = useMemo(() => {
    if (!sortColumn) {
      return users;
    }

    return [...users].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      const comparison = String(aValue).localeCompare(
        String(bValue)
      );

      return sortDirection === "ascending"
        ? comparison
        : -comparison;
    });
  }, [sortColumn, sortDirection]);

  // Pagination
  const pageCount = Math.ceil(sortedUsers.length / PAGE_SIZE);

  const paginatedUsers = sortedUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const start = (page - 1) * PAGE_SIZE + 1;

  const end = Math.min(
    page * PAGE_SIZE,
    sortedUsers.length
  );

  // Sorting handler
  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection((current) =>
        current === "ascending"
          ? "descending"
          : "ascending"
      );
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }

    setPage(1);
  };

  return (
    <div className="w-full">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Manage users table"
            className="min-w-[600px]"
            sortDescriptor={
              sortColumn
                ? {
                    column: sortColumn,
                    direction: sortDirection,
                  }
                : undefined
            }
            onSortChange={(descriptor) => {
              const column = descriptor.column as keyof User;

              setSortColumn(column);
              setSortDirection(descriptor.direction);

              setPage(1);
            }}
          >
            <Table.Header>
              <Table.Column
                id="name"
                allowsSorting
                isRowHeader
              >
                {({sortDirection}) => (
                  <Table.SortableColumnHeader
                    sortDirection={sortDirection}
                  >
                    Name
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column
                id="role"
                allowsSorting
              >
                {({sortDirection}) => (
                  <Table.SortableColumnHeader
                    sortDirection={sortDirection}
                  >
                    Role
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column
                id="status"
                allowsSorting
              >
                {({sortDirection}) => (
                  <Table.SortableColumnHeader
                    sortDirection={sortDirection}
                  >
                    Status
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>

              <Table.Column
                id="email"
                allowsSorting
              >
                {({sortDirection}) => (
                  <Table.SortableColumnHeader
                    sortDirection={sortDirection}
                  >
                    Email
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {paginatedUsers.map((user) => (
                <Table.Row
                  key={user.id}
                  id={String(user.id)}
                >
                  <Table.Cell>
                    {user.name}
                  </Table.Cell>

                  <Table.Cell>
                    {user.role}
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      color={statusColorMap[user.status]}
                      size="sm"
                      variant="soft"
                    >
                      {user.status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    {user.email}
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
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage(page - 1)}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from(
                {length: pageCount},
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

