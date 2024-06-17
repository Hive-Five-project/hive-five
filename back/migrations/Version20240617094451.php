<?php

declare(strict_types=1);

namespace migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240617094451 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE buying_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE frame_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE beehive_frame (beehive_id INT NOT NULL, frame_id INT NOT NULL, PRIMARY KEY(beehive_id, frame_id))');
        $this->addSql('CREATE INDEX IDX_FFEAF129CCAF8463 ON beehive_frame (beehive_id)');
        $this->addSql('CREATE INDEX IDX_FFEAF1293FA3C347 ON beehive_frame (frame_id)');
        $this->addSql('CREATE TABLE buying (id INT NOT NULL, apiary_id INT DEFAULT NULL, user_id INT NOT NULL, uid UUID NOT NULL, uid32 VARCHAR(26) NOT NULL, label VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BC55CD26539B0606 ON buying (uid)');
        $this->addSql('CREATE INDEX IDX_BC55CD26D0E2858B ON buying (apiary_id)');
        $this->addSql('CREATE INDEX IDX_BC55CD26A76ED395 ON buying (user_id)');
        $this->addSql('COMMENT ON COLUMN buying.uid IS \'(DC2Type:ulid)\'');
        $this->addSql('CREATE TABLE frame (id INT NOT NULL, user_id INT NOT NULL, uid UUID NOT NULL, uid32 VARCHAR(26) NOT NULL, label VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B5F83CCD539B0606 ON frame (uid)');
        $this->addSql('CREATE INDEX IDX_B5F83CCDA76ED395 ON frame (user_id)');
        $this->addSql('COMMENT ON COLUMN frame.uid IS \'(DC2Type:ulid)\'');
        $this->addSql('CREATE TABLE riser_frame (riser_id INT NOT NULL, frame_id INT NOT NULL, PRIMARY KEY(riser_id, frame_id))');
        $this->addSql('CREATE INDEX IDX_44EB945B112BB3D5 ON riser_frame (riser_id)');
        $this->addSql('CREATE INDEX IDX_44EB945B3FA3C347 ON riser_frame (frame_id)');
        $this->addSql('ALTER TABLE beehive_frame ADD CONSTRAINT FK_FFEAF129CCAF8463 FOREIGN KEY (beehive_id) REFERENCES beehive (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE beehive_frame ADD CONSTRAINT FK_FFEAF1293FA3C347 FOREIGN KEY (frame_id) REFERENCES frame (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE buying ADD CONSTRAINT FK_BC55CD26D0E2858B FOREIGN KEY (apiary_id) REFERENCES apiary (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE buying ADD CONSTRAINT FK_BC55CD26A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE frame ADD CONSTRAINT FK_B5F83CCDA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE riser_frame ADD CONSTRAINT FK_44EB945B112BB3D5 FOREIGN KEY (riser_id) REFERENCES riser (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE riser_frame ADD CONSTRAINT FK_44EB945B3FA3C347 FOREIGN KEY (frame_id) REFERENCES frame (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE buying_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE frame_id_seq CASCADE');
        $this->addSql('ALTER TABLE beehive_frame DROP CONSTRAINT FK_FFEAF129CCAF8463');
        $this->addSql('ALTER TABLE beehive_frame DROP CONSTRAINT FK_FFEAF1293FA3C347');
        $this->addSql('ALTER TABLE buying DROP CONSTRAINT FK_BC55CD26D0E2858B');
        $this->addSql('ALTER TABLE buying DROP CONSTRAINT FK_BC55CD26A76ED395');
        $this->addSql('ALTER TABLE frame DROP CONSTRAINT FK_B5F83CCDA76ED395');
        $this->addSql('ALTER TABLE riser_frame DROP CONSTRAINT FK_44EB945B112BB3D5');
        $this->addSql('ALTER TABLE riser_frame DROP CONSTRAINT FK_44EB945B3FA3C347');
        $this->addSql('DROP TABLE beehive_frame');
        $this->addSql('DROP TABLE buying');
        $this->addSql('DROP TABLE frame');
        $this->addSql('DROP TABLE riser_frame');
    }
}
