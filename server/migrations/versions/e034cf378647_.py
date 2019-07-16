"""empty message

Revision ID: e034cf378647
Revises: 4805c0d6f96a
Create Date: 2019-07-15 23:41:49.998276

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e034cf378647'
down_revision = '4805c0d6f96a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)
    op.drop_constraint('users_username_key', 'users', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('users_username_key', 'users', ['username'])
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
    # ### end Alembic commands ###
